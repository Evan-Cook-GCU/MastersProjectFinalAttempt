using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Mime;
using System.Text;
using Utils.Request;

namespace BetterYouApi.Logging
{
    /// <summary>
    /// 
    /// </summary>
    public class RequestJsonWriter
    {
        private readonly Formatting _formatting;

        /// <summary>
        /// 
        /// </summary>
        public RequestJsonWriter()
        {
            _formatting = Formatting.None;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="indented"></param>
        public RequestJsonWriter(bool indented)
        {
            _formatting = indented ? Formatting.Indented : Formatting.None;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="environment"></param>
        /// <returns></returns>
        public string CreateRequestJson(IDictionary<string, object> environment)
        {
            StringWriter stringWriter = new StringWriter();
            using (JsonWriter writer = new JsonTextWriter(stringWriter))
            {
                writer.Formatting = _formatting;
                writer.WriteStartObject();

                AddStringProperty("owin.RequestMethod", environment, writer);
                AddStringProperty("owin.RequestPath", environment, writer);
                AddStringProperty("owin.RequestPathBase", environment, writer);
                AddStringProperty("owin.RequestScheme", environment, writer);
                AddStringProperty("owin.RequestQueryString", environment, writer);

                var contentTypeIsJson = false;
                var contentTypeCharacterEncoding = Encoding.UTF8;
                var headersDictionary = environment.ContainsKey("owin.RequestHeaders") ?
                    environment["owin.RequestHeaders"] as IDictionary<string, string[]> : null;
                if (headersDictionary != null)
                {
                    writer.WritePropertyName("RequestHeaders");
                    writer.WriteStartObject();
                    foreach (KeyValuePair<string, string[]> header in headersDictionary)
                    {
                        writer.WritePropertyName(header.Key);
                        if (header.Key == "Authorization")
                        {
                            writer.WriteValue("MASKED");
                        }
                        else if (header.Value.Length == 1)
                        {
                            writer.WriteValue(header.Value[0]);

                            if (header.Key.ToLower().Equals(RequestHeader.ContentType.ToLower()))
                            {
                                var contentType = new ContentType(header.Value[0]);
                                if (contentType.CharSet != null)
                                {
                                    try
                                    {
                                        contentTypeCharacterEncoding = Encoding.GetEncoding(contentType.CharSet);
                                    }
                                    catch (ArgumentException)
                                    {
                                        contentTypeCharacterEncoding = Encoding.UTF8;
                                    }
                                }
                                if (contentType.MediaType.ToLower().Equals("application/json"))
                                {
                                    contentTypeIsJson = true;
                                }
                            }
                        }
                        else
                        {
                            writer.WriteStartArray();
                            foreach (string value in header.Value)
                            {
                                writer.WriteValue(value);
                            }
                            writer.WriteEndArray();
                        }
                    }
                    writer.WriteEndObject();
                }

                var bodyStream = environment.ContainsKey("owin.RequestBody") ? environment["owin.RequestBody"] as Stream : null;
                if (bodyStream != null)
                {
                    long startingPosition = bodyStream.Position;
                    using (var reader = new StreamReader(bodyStream, contentTypeCharacterEncoding, true, 4096, true))
                    {
                        string value = reader.ReadToEnd();
                        writer.WritePropertyName("RequestBody");
                        if (contentTypeIsJson && !string.IsNullOrWhiteSpace(value))
                        {
                            writer.WriteRawValue(value);
                        }
                        else
                        {
                            writer.WriteValue(value);
                        }
                    }
                    bodyStream.Position = startingPosition; // restore the position
                }

                writer.WriteEndObject();
            }
            return stringWriter.ToString();
        }

        private void AddStringProperty(string propertyName, IDictionary<string, object> environment, JsonWriter writer)
        {
            if (environment.ContainsKey(propertyName))
            {
                var value = environment[propertyName];
                if (propertyName.StartsWith("owin.")) // Make the JSON nicer by removing this prefix
                {
                    propertyName = propertyName.Substring("owin.".Length);
                }
                writer.WritePropertyName(propertyName);
                writer.WriteValue(value);
            }
        }

    }
}