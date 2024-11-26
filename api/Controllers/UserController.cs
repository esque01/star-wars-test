using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StarWars.API.Models;

namespace StarWars.API.Controllers;

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


    [HttpPost("/api/refresh-token")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<string> RefreshToken([FromBody] TokenRequest request) {

        if (string.IsNullOrEmpty(request.Token)) {
            return Unauthorized("Token is missing"); 
        }

        try {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("APTManufacturingSolutionsDeliversExcellence256"));

            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ClockSkew = TimeSpan.Zero
            };

            ClaimsPrincipal? principal = tokenHandler.ValidateToken(request.Token, tokenValidationParameters, out var validatedToken);
            
            if (validatedToken is not JwtSecurityToken jwtToken || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)){
                return Unauthorized("Invalid refresh token");
            }

            Claim? emailClaim = principal.FindFirst(ClaimTypes.NameIdentifier);
            
            if (emailClaim == null || string.IsNullOrEmpty(emailClaim.Value))
            {
                return Unauthorized("Email not found in token claims.");
            }

            string email = emailClaim.Value;
            string newJwtToken = GenerateJwtToken(email);
            
            return Ok(newJwtToken);
        }
        catch (Exception) {
            return Unauthorized("Invalid token");
        }
    }

    
    [HttpPost("/api/validate-token")]
    [ProducesResponseType(typeof(int),StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult<int> ValidateToken([FromBody] TokenRequest request)
    {
        if (string.IsNullOrEmpty(request.Token)) {
            return Unauthorized("Token is missing"); 
        }
        try {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("APTManufacturingSolutionsDeliversExcellence256"));

            TokenValidationParameters tokenValidationParameters = new TokenValidationParameters(){
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };

            ClaimsPrincipal principal = tokenHandler.ValidateToken(request.Token, tokenValidationParameters, out var validatedToken);

            return Ok();
        }
        catch (SecurityTokenExpiredException) {
            return Unauthorized("Token has expired");
        } 
        catch (Exception) {
            return Unauthorized("Invalid token");
        }
    }


    private string GenerateJwtToken(string email) {

        Claim[] claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("APTManufacturingSolutionsDeliversExcellence256"));
        SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            expires: DateTime.Now.AddMinutes(15),
            signingCredentials: creds,
            claims: claims
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}