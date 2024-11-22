namespace StarWars.API;

public static class Routes {

    public const string BaseUrl = "https://swapi.dev/api/";


    public static class Characters
    {
        public const string GetStarWarsCharacter = BaseUrl + "people/{0}";
    }
}
