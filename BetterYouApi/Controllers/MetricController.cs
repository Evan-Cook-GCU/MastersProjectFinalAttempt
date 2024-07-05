using System;
using System.Linq;
using System.Web.Http;
using BetterYouApi.Models;
using BetterYouApi.Mappings;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/metrics")]
    public class MetricController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var metrics = context.Metrics.ToList().Select(MappingProfile.ToDTO);
            return Ok(metrics);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var metric = context.Metrics.Include("Fields").FirstOrDefault(m => m.MetricId == id);
            if (metric == null)
            {
                return NotFound();
            }
            return Ok(MappingProfile.ToDTO(metric));
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(MetricDTO metricDto)
        {
            var metric = MappingProfile.ToModel(metricDto);
            context.Metrics.Add(metric);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + metric.MetricId), MappingProfile.ToDTO(metric));
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, MetricDTO metricDto)
        {
            var existingMetric = context.Metrics.FirstOrDefault(m => m.MetricId == id);
            if (existingMetric == null)
            {
                return NotFound();
            }
            existingMetric.Name = metricDto.Name;
            if(metricDto.Fields != null)
            {
                foreach (var field in metricDto.Fields)
                {
                    var existingField = context.Fields.FirstOrDefault(f => f.FieldId == field.FieldId);
                    // If the field does not exist, add it to the context
                    if (existingField == null)
                    {
                        field.MetricId = existingMetric.MetricId;
                        context.Fields.Add(MappingProfile.ToModel(field));
                    }
                    else { 
                        this.UpdateDataWithField(
                            existingMetric.MetricId,
                            existingField.Label,
                            existingField.Type,
                            field.Label,field.Type);
                    existingField.Label = field.Label;
                    existingField.Type = field.Type;
                       //propagate changes to the metricData

                    }
                }
            }
            context.SaveChanges();
            return Ok(MappingProfile.ToDTO(existingMetric));
        }
        private void UpdateDataWithField(int metricid,string oldLabel,string oldType, string newLabel,string newType)
        {
            var metricDatas=context.MetricDatas.Where(md=>md.MetricId==metricid).ToList();
            foreach (var metricData in metricDatas)
            {
                if (metricData.Name == oldLabel)
                {
                    metricData.Name = newLabel;
                }
                var datas = context.Datas.Where(d => d.MetricDataId == metricData.MetricDataId).ToList();
                foreach (var data in datas)
                {
                    if (data.Label == oldLabel)
                    {
                        data.Label = newLabel;
                    }
                }
            }
        }
        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var metric = context.Metrics.FirstOrDefault(m => m.MetricId == id);
            if (metric == null)
            {
                return NotFound();
            }
            context.Metrics.Remove(metric);
            context.SaveChanges();
            return Ok();
        }
        [HttpGet]
        [Route("{metricId:int}/fields")]
        public IHttpActionResult GetFieldsByMetricId(int metricId)
        {
            var fields = context.Fields.Where(f => f.MetricId == metricId);
            if (!fields.Any())
            {
                return NotFound();
            }
            var returnFields = fields.Select(MappingProfile.ToDTO);
           return Ok(returnFields);
        }
    }
}
