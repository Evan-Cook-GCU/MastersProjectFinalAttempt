using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;
using System.Data;
using System.Collections.Generic;

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
            existingData.MetricId = metricDataDto.MetricId;
            existingData.Name = metricDataDto.Name;
            existingData.Date = metricDataDto.Date;
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
            var dataList = context.Datas.ToList().Where(d => d.MetricDataId == metricDataId).ToList();
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
            // Fetch user's group memberships
            var memberships = context.GroupMemberships.Where(gm => gm.UserId == userId).Select(gm => gm.MembershipId).ToList();

            if (!memberships.Any())
            {
                return NotFound();
            }

            // Fetch metric data related to user's memberships and specific metric
            var metricDataList = new List<MetricData>();
            foreach (var membershipId in memberships)
            {
                var data = context.MetricDatas
                    .Where(md => md.MetricId == metricId && md.GroupMembershipId == membershipId)
                    .ToList();
                metricDataList.AddRange(data);
            }

            if (!metricDataList.Any())
            {
                return Ok(new List<MetricDataDTO>());
            }

            // Map to DTOs
            var metricDataDTOs = new List<MetricDataDTO>();
            foreach (var metricData in metricDataList)
            {
                var dataDTOs = new List<DataDTO>();
                var fields =context.Datas.Where(d => d.MetricDataId == metricData.MetricDataId).ToList();
                foreach (var field in fields)
                {
                    dataDTOs.Add(MappingProfile.ToDTO(field));
                }

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

            return Ok(metricDataDTOs);
        }

        [HttpPost]
        [Route("create")]
        public IHttpActionResult CreateMetricData(createMetricData createData)
        {
            var metric = context.Metrics.FirstOrDefault(m => m.MetricId == createData.metricId);
            // Fetch the GroupMembershipId for the given userId
            var groupMembership = context.GroupMemberships.FirstOrDefault(gm => gm.UserId == createData.userId && gm.GroupId==metric.GroupId);
            if (groupMembership == null)
            {
                return NotFound();
            }

            // Create new MetricData
            var metricData = new MetricData
            {
                MetricId = createData.metricId,
                GroupMembershipId = groupMembership.MembershipId,
                Name = createData.label,
                Date = createData.date,
                Fields = new List<Data>
                {
                    new Data
                    {
                        Label = createData.label,
                        Value = createData.value
                    }
                }
            };

            context.MetricDatas.Add(metricData);
            context.SaveChanges();
            context.Datas.Where(d => d.MetricDataId == metricData.MetricDataId).ToList();

            return Created(new Uri(Request.RequestUri + "/" + metricData.MetricDataId), MappingProfile.ToDTO(metricData));
        }
        public class createMetricData
        {
            public int metricId { get; set; }
            public int userId { get; set; }
            public string label { get; set; }
            public double value { get; set; }
            public DateTime date { get; set; }
        }
    }
}
