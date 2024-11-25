using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


public class UserController : ControllerBase {

    [HttpPost("/api/login")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<string> Login([FromBody] LoginRequest request) {

        if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password)) return BadRequest();

        if (request.Email == "testuser@email.com" && request.Password == "password") {
            string token = GenerateJwtToken(request.Email);
            return Ok(token);
        }

        return Unauthorized();
    }


    private string GenerateJwtToken(string email) {

        Claim[] claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("thisisaverylong256bitsecretkey12345678"));
        SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds,
            claims: claims
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}