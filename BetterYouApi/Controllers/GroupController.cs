using System;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Web.Http;
using BetterYouApi.Models;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/groups")]
    public class GroupController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpGet]
        [Route("")]
        public IHttpActionResult GetAll()
        {
            var x=context.Groups.ToList();
            return Ok(context.Groups.ToList());
        }

        [HttpGet]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            var group = context.Groups
                .Include("Metrics.Fields")
                .Include("Metrics.Data.Fields")
                .FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }

            var groupDTO = new GroupDTO
            {
                GroupId = group.GroupId,
                GroupName = group.GroupName,
                Description = group.Description,
                CreatedAt = group.CreatedAt,
                Metrics = group.Metrics.Select(m => new MetricDTO
                {
                    MetricId = m.MetricId,
                    Name = m.Name,
                    Fields = m.Fields.Select(f => new FieldDTO
                    {
                        FieldId = f.FieldId,
                        Label = f.Label,
                        Type = f.Type
                    }).ToList(),
                    Data = m.Data.Select(d => new MetricDataDTO
                    {
                        MetricDataId = d.MetricDataId,
                        MetricId = d.MetricId,
                        Name = d.Name,
                        Date = d.Date,
                        GroupMembershipId = d.GroupMembershipId,
                        Fields = d.Fields.Select(df => new DataDTO
                        {
                            DataId = df.DataId,
                            Label = df.Label,
                            Value = df.Value
                        }).ToList()
                    }).ToList()
                }).ToList()
            };

            return Ok(groupDTO);
        }

        [HttpPost]
        [Route("")]
        public IHttpActionResult Create(Group group)
        {
            group.CreatedAt = DateTime.Now;
            context.Groups.Add(group);
            context.SaveChanges();
            return Created(new Uri(Request.RequestUri + "/" + group.GroupId), group);
        }

        [HttpPut]
        [Route("{id:int}")]
        public IHttpActionResult Update(int id, Group group)
        {
            var existingGroup = context.Groups.FirstOrDefault(g => g.GroupId == id);
            if (existingGroup == null)
            {
                return NotFound();
            }
            existingGroup.GroupName = group.GroupName;
            existingGroup.Description = group.Description;
            context.SaveChanges();
            return Ok(existingGroup);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            var group = context.Groups.FirstOrDefault(g => g.GroupId == id);
            if (group == null)
            {
                return NotFound();
            }
            context.Groups.Remove(group);
            context.SaveChanges();
            return Ok();
        }
    }
}
