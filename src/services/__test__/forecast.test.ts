import { StormGlass } from '@src/clients/stormGlass';
import { Beach, BeachPosition } from '@src/models/beach';
import { Forecast } from '@src/services/forecast';
import stormGlassNormalizedResponseFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json';

jest.mock('@src/clients/stormGlass');

const mockedStormGlassService = new StormGlass() as jest.Mocked<StormGlass>;

describe('Forecast Service', () => {
  it('should return the forecast for a list of beaches', async () => {
    mockedStormGlassService.fetchPoints.mockResolvedValue(
      stormGlassNormalizedResponseFixture
    );

    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        user: 'fake-id',
      },
    ];

    const expectedResponse = [
      {
        time: '2021-08-17T00:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            time: '2021-08-17T00:00:00+00:00',
            swellDirection: 63.62,
            swellHeight: 0.12,
            swellPeriod: 8.22,
            waveDirection: 180.35,
            waveHeight: 1.4,
            windDirection: 250.12,
            windSpeed: 4.33,
          },
        ],
      },
      {
        time: '2021-08-17T01:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            time: '2021-08-17T01:00:00+00:00',
            swellDirection: 101.29,
            swellHeight: 0.61,
            swellPeriod: 9.46,
            waveDirection: 179.79,
            waveHeight: 1.46,
            windDirection: 223.84,
            windSpeed: 4.65,
          },
        ],
      },
      {
        time: '2021-08-17T02:00:00+00:00',
        forecast: [
          {
            lat: -33.792726,
            lng: 151.289824,
            name: 'Manly',
            position: 'E',
            rating: 1,
            time: '2021-08-17T02:00:00+00:00',
            swellDirection: 138.96,
            swellHeight: 1.09,
            swellPeriod: 10.69,
            waveDirection: 179.22,
            waveHeight: 1.52,
            windDirection: 197.55,
            windSpeed: 4.98,
          },
        ],
      },
    ];

    const forecast = new Forecast(mockedStormGlassService);

    const beachesWithRating = await forecast.processForecastForBeaches(beaches);

    expect(beachesWithRating).toEqual(expectedResponse);
  });

  it('should return an empty list when the beaches array is empty', async () => {
    const forecast = new Forecast();
    const response = await forecast.processForecastForBeaches([]);
    expect(response).toEqual([]);
  });

  it('should throw internal processing error when something goes wrong during the rating process', async () => {
    const beaches: Beach[] = [
      {
        lat: -33.792726,
        lng: 151.289824,
        name: 'Manly',
        position: BeachPosition.E,
        user: 'fake-id',
      },
    ];

    mockedStormGlassService.fetchPoints.mockRejectedValue(
      'Error fetching data'
    );

    const forecast = new Forecast(mockedStormGlassService);

    await expect(forecast.processForecastForBeaches(beaches)).rejects.toThrow(
      Error
    );
  });
});
