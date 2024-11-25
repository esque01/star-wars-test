namespace StarWars.API;

public static class Routes {

    public const string BaseUrl = "https://swapi.dev/api/";


    public static class Characters
    {
        public const string StarWarsCharactersURI = BaseUrl + "people";
    }
    public static class User 
    {
        public const string LoginURI = "/api/login";
    }
}
