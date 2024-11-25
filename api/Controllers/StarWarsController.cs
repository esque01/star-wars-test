using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using StarWars.API.Models;

namespace StarWars.API.Controllers;

[ApiController]
[Route("api/people")]
public class StarWarsController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public StarWarsController(IHttpClientFactory httpClientFactory) {
        _httpClient = httpClientFactory.CreateClient();
    }


    [HttpGet("/api/people")]
    [ProducesResponseType(typeof(StarWarsResult), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<StarWarsResult>> GetStarWarsCharacters() {
        
        StarWarsResult starWarsResult = new StarWarsResult();
        string nextPageUrl = Routes.Characters.StarWarsCharactersURI;

        while (!string.IsNullOrEmpty(nextPageUrl)) {
            HttpResponseMessage? response = await _httpClient.GetAsync(nextPageUrl).ConfigureAwait(false);

            if (!response.IsSuccessStatusCode) {
                return BadRequest("Failed to fetch Star Wars characters.");
            }

            string jsonString = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

            StarWarsResult? page = JsonSerializer.Deserialize<StarWarsResult>(
                jsonString,
                new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower }
            );

            if (page != null) {
                if (starWarsResult.Count == 0 && page.Count > 0) {
                    starWarsResult.Count = page.Count;
                }

                starWarsResult.Results.AddRange(page.Results);
                nextPageUrl = page.Next;
            }
        }
        return Ok(starWarsResult);
    }
}
