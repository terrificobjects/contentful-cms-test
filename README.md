# contentful-cms-test
Testing JS API to WordPress plugin data fetch.

## API Access
Use the WordPress Dashboard and go to the Contentful Settings menu item. You can enter your share ID and personal token here. They will save to wp_options as of the current version.

## Shortcodes
There are shortcodes associated with the plugin. These shortcodes are dynamically generated using JavaScript. 

Shortcode List:
[contentful_series_title]
[contentful_series_page_title]
[contentful_series_year]
[contentful_series_director]
[contentful_series_description]
[contentful_series_poster]
[contentful_series_clearlogo]
[contentful_series_air_date]
[contentful_series_language]
[contentful_series_actors]

## How are these values retrieved in JS?

Find information on the Contentful ClientAPI for JS here: [Contentful createClient API Documentation](https://contentful.github.io/contentful.js/contentful/10.5.2/functions/createClient.html)
You can also find more information about Contentful JS API here: [Contentful JS API Documentation](https://contentful.github.io/contentful.js/contentful/10.5.2/index.html)

## JSON Array
For my example JSON returned by Contentful for my TV Shows content type, I have:

```{
  "name": "TV Show",
  "description": "This is the TV Show content type. This will contain a title, year, description, image link and more provided by theTVDB API, provided I can work with that through Contentful!",
  "displayField": "terrificSeriesTitle",
  "fields": [
    {
      "id": "terrificSeriesTitle",
      "name": "Series Title",
      "type": "Symbol",
      "localized": true,
      "required": true,
      "validations": [
        {
          "unique": true
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "terrificSeriesYear",
      "name": "Series Year",
      "type": "Integer",
      "localized": false,
      "required": true,
      "validations": [
        {
          "range": {
            "min": 1845,
            "max": 2059
          },
          "message": "You must enter a year when the movie was/is released between 1845 and 2059."
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "terrificSeriesDescription",
      "name": "Series Description",
      "type": "Text",
      "localized": true,
      "required": true,
      "validations": [
        {
          "size": {
            "min": 0,
            "max": 1500
          },
          "message": "You have reached the 1500 character max."
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "terrificSeriesPoster",
      "name": "Series Poster",
      "type": "Link",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "seriesClearlogo",
      "name": "Series Clearlogo",
      "type": "Link",
      "localized": false,
      "required": false,
      "validations": [
        {
          "linkMimetypeGroup": [
            "image"
          ],
          "message": "You must upload an image type for this field."
        }
      ],
      "disabled": false,
      "omitted": false,
      "linkType": "Asset"
    },
    {
      "id": "terrificSeriesDirectors",
      "name": "Series Director(s)",
      "type": "Array",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Symbol",
        "validations": []
      }
    },
    {
      "id": "terrificSeriesLanguage",
      "name": "Series Language",
      "type": "Symbol",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "terrificSeriesAirDate",
      "name": "Series Air Date",
      "type": "Date",
      "localized": false,
      "required": false,
      "validations": [
        {
          "dateRange": {
            "after": null,
            "before": null,
            "min": "1850-07-19"
          }
        }
      ],
      "disabled": false,
      "omitted": false
    },
    {
      "id": "terrificSeriesActors",
      "name": "Series Actors",
      "type": "Array",
      "localized": false,
      "required": false,
      "validations": [],
      "disabled": false,
      "omitted": false,
      "items": {
        "type": "Symbol",
        "validations": []
      }
    }
  ],
}```
