namespace StarWars.API.Models;

public class StarWarsResult {
    
    public int Count { get; set; }
    public string Next { get; set; }
    public string Previous { get; set; }
    public List<StarWarsCharacter> Results { get; set; }

    public StarWarsResult() {
        Results = new List<StarWarsCharacter>();
    }
}
