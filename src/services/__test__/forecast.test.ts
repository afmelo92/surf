import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachPosition, Forecast } from '@src/services/forecast';
import stormGlassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('@src/clients/stormGlass');

describe('Forecast Service', () => {
  it('should return the forecast for a list of beaches', async () => {
    StormGlass.prototype.fetchPoints = jest
      .fn()
      .mockResolvedValue(stormGlassNormalizedResponseFixture);

    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        user: 'some-id',
      },
    ];

    const expectedResponse = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 63.62,
        swellHeight: 0.12,
        swellPeriod: 8.22,
        time: '2021-08-17T00:00:00+00:00',
        waveDirection: 180.35,
        waveHeight: 1.4,
        windDirection: 250.12,
        windSpeed: 4.33,
      },
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 101.29,
        swellHeight: 0.61,
        swellPeriod: 9.46,
        time: '2021-08-17T01:00:00+00:00',
        waveDirection: 179.79,
        waveHeight: 1.46,
        windDirection: 223.84,
        windSpeed: 4.65,
      },
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: 'E',
        rating: 1,
        swellDirection: 138.96,
        swellHeight: 1.09,
        swellPeriod: 10.69,
        time: '2021-08-17T02:00:00+00:00',
        waveDirection: 179.22,
        waveHeight: 1.52,
        windDirection: 197.55,
        windSpeed: 4.98,
      },
    ];

    const forecast = new Forecast(new StormGlass());

    const beachesWithRating = await forecast.processForecastForBeaches(beaches);

    expect(beachesWithRating).toEqual(expectedResponse);
  });
});
