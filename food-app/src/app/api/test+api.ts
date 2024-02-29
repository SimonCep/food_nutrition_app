import { ExpoRequest, ExpoResponse } from "expo-router/server";

export function GET(request: ExpoRequest) {
  return ExpoResponse.json({ hi: "Hello World!!" });
}
// TODO: Norint greit pratestuoti API galima padaryt taip: curl localhost:8081/api/test
//        - Bet geresnis variantas yra yra naudot postmana. https://www.postman.com/
