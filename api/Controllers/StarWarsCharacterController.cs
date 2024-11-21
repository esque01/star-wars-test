using Microsoft.AspNetCore.Mvc;
using StarWars.API.Routes;

namespace api.Controllers;

[ApiController]
public class StarWarsCharacterController : ControllerBase
{

    public StarWarsCharacterController() {
        
    }

    [HttpGet(Name = "GetStarWarsCharacter")]
    [Route(Routes.GetStarWarsCharacter)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult GetStarWarsCharacter() {
        return Ok();
    }
}
