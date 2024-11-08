import publicationsData from '$lib/assets/publications/publications.json';


function parseYMD(yyyymmdd: string) {
    // if any character is not a number, return null
    if (!yyyymmdd.match(/^\d+$/)) {
        return { yyyy: null, mm: null, dd: null };
    }
    // if exactly 4 characters, assume yyyy, return mm and dd as null
    if (yyyymmdd.length === 4) {
        return { yyyy: parseInt(yyyymmdd), mm: null, dd: null };
    }
    // if exactly 6 characters, assume yyyymm, return dd as null
    if (yyyymmdd.length === 6) {
        // Range check mm and dd
        let mm: number | null = parseInt(yyyymmdd.slice(4, 6));
        if (mm < 1 || mm > 12) {
            mm = null;
        }
        return { yyyy: yyyymmdd.slice(0, 4), mm, dd: null };
    }
    // if exactly 8 characters, parse as yyyymmdd
    if (yyyymmdd.length === 8) {
        // Range check mm and dd
        let mm: number | null = parseInt(yyyymmdd.slice(4, 6));
        let dd: number | null = parseInt(yyyymmdd.slice(6, 8));
        if (mm < 1 || mm > 12) {
            mm = null;
        }
        if (dd < 1 || dd > 31) {
            dd = null;
        }
        return { yyyy: yyyymmdd.slice(0, 4), mm, dd };
    }
    throw new Error(`Invalid yyyymmdd format: ${yyyymmdd}`);
}


export function load() {
    // Check thumbnails exist on disk
    for (const publication of publicationsData.publications) {
        if (!publication.thumbnail) {
            console.log(`Missing thumbnail for publication ${publication.title}`);
        }
    }




    // Reformat the publications into a dictionary of arrays of publications, grouped by year. Values are array of publications sorted by month and day.

    const publicationsByYear: { [year: number | string]: Array<typeof publicationsData.publications[number]> } = {};
    const groupPapersOlderThanYear = publicationsData.groupPapersOlderThanYear;
    for (const publication of publicationsData.publications) {
        let { yyyy } = parseYMD(publication.yyyymmdd);

        // Parse int for yyyy, default to null
        if (typeof yyyy === "string") {
            yyyy = parseInt(yyyy);
        }

        if (yyyy === null) {
            yyyy = "Other";
        }

        // If the publication is older than the groupPapersOlderThanYear, relabel to cutoff year + "and Earlier"
        // Check and compare only if yyyy is number
        if (typeof yyyy === "number" && yyyy <= groupPapersOlderThanYear) {
            yyyy = groupPapersOlderThanYear + " and Earlier";
        }

        if (!publication.thumbnailSummary) {
            publication.thumbnailSummary = "Figure from paper";
        }

        // If the year is not in the dictionary, add it
        if (!(yyyy in publicationsByYear)) {
            publicationsByYear[yyyy] = [];
        }

        // Add the publication to the array of publications for that year
        publicationsByYear[yyyy].push(publication);
    }

    // Init a new object to store the sorted publications with the years sorted decending
    const publicationsByYearSorted: { [year: number | string]: Array<typeof publicationsData.publications[number]> } = {};

    // Sort the publications by year descending
    for (const [year, publications] of Object.entries(publicationsByYear)) {
        publications.sort((b, a) => {
            const aDate = parseYMD(a.yyyymmdd);
            const bDate = parseYMD(b.yyyymmdd);
            if (aDate.yyyy === bDate.yyyy) {
                if (aDate.mm === bDate.mm) {
                    return (aDate.dd || 0) - (bDate.dd || 0);
                }
                return (aDate.mm || 0) - (bDate.mm || 0);
            }
            // Year can be null, string, or number, so check type and if not number default to 0
            const aYear = typeof aDate.yyyy === "number" ? aDate.yyyy : 0;
            const bYear = typeof bDate.yyyy === "number" ? bDate.yyyy : 0;
            return (aYear - bYear);
        });
        publicationsByYearSorted[year] = publications;
    }

    // Sort the keys of the object by year descending: If can parse as number, sort by number, otherwise sort by string and put at the end
    const years = Object.keys(publicationsByYearSorted);
    const realYears: Array<number> = [];
    const stringYears: Array<string> = [];
    
    for (const year of years) {
        if (typeof year === "string" && year.match(/^\d+$/)) {
            realYears.push(parseInt(year));
        } else {
            stringYears.push(year);
        }
    }
    
    realYears.sort((a, b) => (b || 0) - (a || 0));
    stringYears.sort((b, a) => b.localeCompare(a));

    // Merge the sorted realYears and stringYears into one array
    let yearsSorted = [...realYears, ...stringYears];

    return { 
        publications : publicationsByYearSorted,
        yearsSorted,
    };
}