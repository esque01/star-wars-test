namespace StarWars.API.Models;


public class LoginRequest {
    public string  Email { get; set; }
    public string Password { get; set; }

    public LoginRequest() {}
}