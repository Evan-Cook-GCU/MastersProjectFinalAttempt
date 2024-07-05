using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;
using System.Data;
using System.Collections.Generic;
using System.Data.Entity.Migrations;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metricdata")]
    public class MetricDataController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var metricDataList = context.MetricDatas.ToList().Select(MappingProfile.ToDTO);
            return Ok(metricDataList);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var data = context.MetricDatas.Include("Fields").FirstOrDefault(md => md.MetricDataId == id);
            if (data == null)
            {
                return NotFound();
            }
            return Ok(MappingProfile.ToDTO(data));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(MetricDataDTO metricDataDto)
        {
            var data = MappingProfile.ToModel(metricDataDto);
            data.Date = DateTime.Now;
            context.MetricDatas.Add(data);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + data.MetricDataId), MappingProfile.ToDTO(data));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, MetricDataDTO metricDataDto)
        {
            var existingData = context.MetricDatas.FirstOrDefault(md => md.MetricDataId == id);
            if (existingData == null)
            {
                return NotFound();
            }

            UpdateExistingData(existingData, metricDataDto);
            context.SaveChanges();

            return Ok(MappingProfile.ToDTO(existingData));
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var data = context.MetricDatas.FirstOrDefault(md => md.MetricDataId == id);
            if (data == null)
            {
                return NotFound();
            }

            context.MetricDatas.Remove(data);
            context.SaveChanges();

            return Ok();
        }

        [HttpGet]
        [Route("{metricDataId:int}/data")]
        public IHttpActionResult GetDataByMetricDataId(int metricDataId)
        {
            var metricData = context.MetricDatas.Include("Fields").Include("Data").FirstOrDefault(md => md.MetricDataId == metricDataId);
            if (metricData == null)
            {
                return NotFound();
            }

            var dataList = context.Datas.Where(d => d.MetricDataId == metricDataId).ToList();
            if (dataList == null)
            {
                return NotFound();
            }

            return Ok(dataList.Select(MappingProfile.ToDTO));
        }

        [HttpGet]
        [Route("user/{userId:int}/metric/{metricId:int}")]
        public IHttpActionResult GetMetricDataByUserIdAndMetricId(int userId, int metricId)
        {
            var memberships = GetMembershipsByUserId(userId);

            if (!memberships.Any())
            {
                return NotFound();
            }

            var metricDataList = GetMetricDataList(memberships, metricId);

            if (!metricDataList.Any())
            {
                return Ok(new List<MetricDataDTO>());
            }

            var metricDataDTOs = MapMetricDataToDTO(metricDataList);
            metricDataDTOs = metricDataDTOs.OrderBy(md => md.Date).ToList();

            return Ok(metricDataDTOs);
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult CreateMetricData(CreateMetricDataModel createData)
        {
            var metric = context.Metrics.FirstOrDefault(m => m.MetricId == createData.MetricId);
            var groupMembership = GetGroupMembership(createData.UserId, metric.GroupId);

            if (groupMembership == null)
            {
                return NotFound();
            }

            var existingMetricData = GetExistingMetricData(createData.MetricId, groupMembership.MembershipId, createData.Date);

            if (existingMetricData.Any())
            {
                UpdateExistingMetricData(existingMetricData, createData);
                context.SaveChanges();
                return Ok(MappingProfile.ToDTO(existingMetricData.FirstOrDefault()));
            }
            else
            {
                var metricData = CreateNewMetricData(createData, groupMembership);
                context.MetricDatas.AddOrUpdate(metricData);
                context.SaveChanges();
                return Created(new Uri(Request.RequestUri + "/" + metricData.MetricDataId), MappingProfile.ToDTO(metricData));
            }
        }

        private void UpdateExistingData(MetricData existingData, MetricDataDTO metricDataDto)
        {
            existingData.MetricId = metricDataDto.MetricId;
            existingData.Name = metricDataDto.Name;
            existingData.Date = metricDataDto.Date;
        }

        private List<int> GetMembershipsByUserId(int userId)
        {
            return context.GroupMemberships.Where(gm => gm.UserId == userId).Select(gm => gm.MembershipId).ToList();
        }

        private List<MetricData> GetMetricDataList(List<int> memberships, int metricId)
        {
            var metricDataList = new List<MetricData>();

            foreach (var membershipId in memberships)
            {
                var data = context.MetricDatas
                    .Where(md => md.MetricId == metricId && md.GroupMembershipId == membershipId)
                    .ToList();
                metricDataList.AddRange(data);
            }

            return metricDataList;
        }

        private List<MetricDataDTO> MapMetricDataToDTO(List<MetricData> metricDataList)
        {
            var metricDataDTOs = new List<MetricDataDTO>();

            foreach (var metricData in metricDataList)
            {
                var dataDTOs = context.Datas.Where(d => d.MetricDataId == metricData.MetricDataId)
                    .Select(MappingProfile.ToDTO)
                    .ToList();

                var metricDataDTO = new MetricDataDTO
                {
                    MetricDataId = metricData.MetricDataId,
                    MetricId = metricData.MetricId,
                    Name = metricData.Name,
                    Date = metricData.Date,
                    GroupMembershipId = metricData.GroupMembershipId,
                    Fields = dataDTOs
                };

                metricDataDTOs.Add(metricDataDTO);
            }

            return metricDataDTOs;
        }

        private GroupMembership GetGroupMembership(int userId, int groupId)
        {
            return context.GroupMemberships.FirstOrDefault(gm => gm.UserId == userId && gm.GroupId == groupId);
        }

        private List<MetricData> GetExistingMetricData(int metricId, int membershipId, DateTime date)
        {
            return context.MetricDatas.Where(md => md.MetricId == metricId
                && md.GroupMembershipId == membershipId
                && md.Date == date)
                .ToList();
        }

        private void UpdateExistingMetricData(List<MetricData> existingMetricData, CreateMetricDataModel createData)
        {
            foreach (var existingMetricDatum in existingMetricData)
            {
                foreach (var data in existingMetricDatum.Fields)
                {
                    if (data.Label == createData.Label)
                    {
                        data.Value = createData.Value;
                    }
                    else
                    {
                        existingMetricDatum.Fields.Add(new Data
                        {
                            Label = createData.Label,
                            Value = createData.Value
                        });
                    }
                }
                context.MetricDatas.AddOrUpdate(existingMetricDatum);
            }
        }

        private MetricData CreateNewMetricData(CreateMetricDataModel createData, GroupMembership groupMembership)
        {
            return new MetricData
            {
                MetricId = createData.MetricId,
                GroupMembershipId = groupMembership.MembershipId,
                Name = createData.Label,
                Date = createData.Date,
                Fields = new List<Data>
                {
                    new Data
                    {
                        Label = createData.Label,
                        Value = createData.Value
                    }
                }
            };
        }

        public class CreateMetricDataModel
        {
            public int MetricId { get; set; }
            public int UserId { get; set; }
            public string Label { get; set; }
            public double Value { get; set; }
            public DateTime Date { get; set; }
        }
    }
}
