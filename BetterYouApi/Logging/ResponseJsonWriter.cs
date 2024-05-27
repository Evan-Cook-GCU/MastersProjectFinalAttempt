using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;

namespace BetterYouApi.Logging
{
    /// <summary>
    /// 
    /// </summary>
    public class ResponseJsonWriter
    {
        private readonly Formatting _formatting;

        /// <summary>
        /// 
        /// </summary>
        public ResponseJsonWriter()
        {
            _formatting = Formatting.None;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="indented"></param>
        public ResponseJsonWriter(bool indented)
        {
            _formatting = indented ? Formatting.Indented : Formatting.None;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="environment"></param>
        /// <returns></returns>
        public string CreateResponseJson(IDictionary<string, object> environment)
        {
            StringWriter stringWriter = new StringWriter();
            using (JsonWriter writer = new JsonTextWriter(stringWriter))
            {
                writer.Formatting = _formatting;
                writer.WriteStartObject();

                AddStringProperty("owin.ResponseStatusCode", environment, writer);
                AddStringProperty("owin.ResponseReasonPhrase", environment, writer);

                var headersDictionary = environment.ContainsKey("owin.ResponseHeaders") ?
                    environment["owin.ResponseHeaders"] as IDictionary<string, string[]> : null;
                if (headersDictionary != null)
                {
                    writer.WritePropertyName("ResponseHeaders");
                    writer.WriteStartObject();
                    foreach (KeyValuePair<string, string[]> header in headersDictionary)
                    {
                        writer.WritePropertyName(header.Key);
                        if (header.Value.Length == 1)
                        {
                            writer.WriteValue(header.Value[0]);
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