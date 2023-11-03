// NY Eatery RSS interfaces

interface EateryAuthor {
    author: string;
    author_detail: {
        name: string;
    };
    authors: { name: string }[];
}

interface EateryContent {
    content: {
        base: string;
        language: string;
        type: string;
        value: string;
    }[];
}

interface EateryLink {
    guidislink: boolean;
    id: string;
    link: string;
    links: {
        href: string;
        rel: string;
        type: string;
    }[];
}

interface EateryPublished {
    published: string;
    published_parsed: number[];
}

interface EaterySummary {
    summary: string;
}

interface EateryTitle {
    title: string;
    title_detail: {
        base: string;
        language: string;
        type: string;
        value: string;
    };
}

interface EateryUpdated {
    updated: string;
    updated_parsed: number[];
}

export interface EateryFeedItem extends EateryAuthor, EateryContent, EateryLink, EateryPublished, EaterySummary, EateryTitle, EateryUpdated {
    main_image_src: string;
    main_image_alt: string;
}
