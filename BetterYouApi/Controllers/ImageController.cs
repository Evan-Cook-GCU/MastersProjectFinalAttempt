using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BetterYouApi.Controllers
{
    [RoutePrefix("api/images")]
    public class ImageController : ApiController
    {
        private BetterYouContext context = new BetterYouContext();

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> UploadImage()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);

            var file = provider.Contents.FirstOrDefault();
            if (file == null)
            {
                return BadRequest("No file uploaded.");
            }

            var fileBytes = await file.ReadAsByteArrayAsync();
            var fileName = file.Headers.ContentDisposition.FileName.Trim('"');

            var image = new Image
            {
                FileName = fileName,
                FileContent = fileBytes,
                UploadedAt = DateTime.Now
            };

            context.Images.Add(image);
            await context.SaveChangesAsync();

            return Ok("Image uploaded successfully.");
        }

        [HttpGet]
        [Route("latest")]
        public IHttpActionResult GetLatestImage()
        {
            var latestImage = context.Images.OrderByDescending(i => i.UploadedAt).FirstOrDefault();
            if (latestImage == null)
            {
                return NotFound();
            }

            var base64String = Convert.ToBase64String(latestImage.FileContent);
            var dataUrl = $"data:image/png;base64,{base64String}";

            return Ok(dataUrl);
        }
    }
}