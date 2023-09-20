document.addEventListener('DOMContentLoaded', function() {
    const client = contentful.createClient({
        space: contentfulSettings.space_id,
        accessToken: contentfulSettings.access_token
    });

    // Get the WordPress page title- we're going to need this in a moment
    const wpPageTitle = document.title.split('–')[0].trim();
	
	//Uncomment this if you need to compare the WordPress page title to the title being returned by the Contentful API
	//console.log(wpPageTitle);

    function fetchAndUpdateContent() {
        client.getEntries({
            'content_type': 'tvShow'
        }).then((response) => {
            response.items.forEach(item => {
                const fields = item.fields;
				
				//uncomment this to compare the Contentful API to the WordPress title returned above
				//console.log(fields.terrificSeriesTitle);
				
                // Check if the TV show title grabbed from contenful matches the WordPress page title!
                if (fields.terrificSeriesTitle === wpPageTitle) {
                    updatePageContent(fields);
                }
            });
        });
    }
	
	function updateActorsTable(actorsArray) {
	    const tableElement = document.getElementById('contentful-series-actors');
	    tableElement.innerHTML = '';

	    actorsArray.forEach(actor => {
	        const row = document.createElement('tr');
	        const cell = document.createElement('td');
	        cell.innerText = actor;
	        cell.style.border = 'none';
	        row.appendChild(cell);
	        tableElement.appendChild(row);
	    });
	}

    function updatePageContent(fields) {
        const seriesTitleElement = document.getElementById('contentful-series-title');
        if (seriesTitleElement) {
            seriesTitleElement.innerText = fields.terrificSeriesTitle;
        }

        const seriesYearElement = document.getElementById('contentful-series-year');
        if (seriesYearElement) {
            seriesYearElement.innerText = fields.terrificSeriesYear;
        }

        const seriesDirectorElement = document.getElementById('contentful-series-director');
		if (seriesDirectorElement && fields.terrificSeriesDirectors) {
		    if (Array.isArray(fields.terrificSeriesDirectors)) {
		        seriesDirectorElement.innerText = fields.terrificSeriesDirectors.join(', ');
		    } else {
		        seriesDirectorElement.innerText = fields.terrificSeriesDirectors;
		    }
		}

        const seriesDescriptionElement = document.getElementById('contentful-series-description');
        if (seriesDescriptionElement) {
            seriesDescriptionElement.innerText = fields.terrificSeriesDescription;
        }

        const seriesPosterElement = document.getElementById('contentful-series-poster');
        if (seriesPosterElement && fields.terrificSeriesPoster && fields.terrificSeriesPoster.fields.file.url) {
            seriesPosterElement.src = fields.terrificSeriesPoster.fields.file.url;
        }
		
        const seriesClearlogoElement = document.getElementById('contentful-series-clearlogo');
        if (seriesClearlogoElement && fields.seriesClearlogo && fields.seriesClearlogo.fields.file.url) {
            seriesClearlogoElement.src = fields.seriesClearlogo.fields.file.url;
        }
		
		const seriesLanguageElement = document.getElementById('contentful-series-language');
        if (seriesLanguageElement) {
            seriesLanguageElement.innerText = fields.terrificSeriesLanguage;
        }
		
    	const seriesAirDateElement = document.getElementById('contentful-series-air-date');
    	if (seriesAirDateElement && fields.terrificSeriesAirDate) {
    	    const airDate = new Date(fields.terrificSeriesAirDate);
    	    const formattedAirDate = airDate.toLocaleDateString('en-US', {
    	        year: 'numeric',
    	        month: 'long',
    	        day: 'numeric'
    	    });
    	    seriesAirDateElement.innerText = formattedAirDate;
    	}
		
	    if (fields.terrificSeriesActors && Array.isArray(fields.terrificSeriesActors)) {
	        updateActorsTable(fields.terrificSeriesActors);
	    }
    }

    fetchAndUpdateContent();
    setInterval(fetchAndUpdateContent, 300000);
});
