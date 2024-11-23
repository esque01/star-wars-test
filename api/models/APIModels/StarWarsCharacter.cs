using System.Text.Json.Serialization;

namespace StarWars.API.Models;

public class StarWarsCharacter {
    
    public string Name { get; set; }
    public string Height { get; set; }
    public string Mass { get; set; }
    public string HairColor { get; set; }
    public string SkinColor { get; set; }
    public string EyeColor { get; set; }
    public string BirthYear { get; set; }
    public string Gender { get; set; }

    [JsonPropertyName("homeworld")]
    public string HomeWorld { get; set; }
    public List<string> Films { get; set; }
    public List<string> Species { get; set; }
    public List<string> Vehicles { get; set; }

    [JsonPropertyName("starships")]
    public List<string> StarShips { get; set; }
    public DateTime Created { get; set; }
    public DateTime Edited { get; set; }
    public string Url { get; set; }

    public StarWarsCharacter() {}
}
