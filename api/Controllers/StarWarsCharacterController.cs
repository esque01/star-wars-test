using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using StarWars.API.Models;

namespace StarWars.API.Controllers;

[ApiController]
[Route("api/people")]
public class StarWarsCharacterController : ControllerBase
{
    private readonly HttpClient _httpClient;

    public StarWarsCharacterController(IHttpClientFactory httpClientFactory) {
        _httpClient = httpClientFactory.CreateClient();
    }


    [HttpGet("{personId}")]
    [ProducesResponseType(typeof(StarWarsCharacter), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<StarWarsCharacter>> GetStarWarsCharacter(int personId) {

        string url = string.Format(Routes.Characters.GetStarWarsCharacter, personId);

        HttpResponseMessage response = await _httpClient.GetAsync(url);

        if (response.IsSuccessStatusCode) {
            string jsonString = await response.Content.ReadAsStringAsync();

            StarWarsCharacter starWarsCharacter = JsonSerializer
                .Deserialize<StarWarsCharacter>(
                    jsonString, 
                    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower }
                );

            return Ok(starWarsCharacter);
        }
        
        return StatusCode((int) response.StatusCode,  $"Error: {response.ReasonPhrase}");
    }
}
