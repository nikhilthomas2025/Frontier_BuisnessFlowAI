export class RequestManager {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.requests = [];
        this.validSources = ['whatsapp', 'discord', 'email', 'sms'];
    }

    /**
     * Fetches customer requests from the designated API endpoint.
     */
    async fetchRequests() {
        try {
            const response = await fetch(this.apiUrl);

            if (!response.ok) {
                throw new Error(`API Connection Failed: ${response.status} ${response.statusText}`);
            }

            this.requests = await response.json();
            return this.requests;
        } catch (error) {
            console.error("Error fetching customer requests:", error);
            return [];
        }
    }

    /**
     * Sorts an array of requests based on importance and time urgency.
     */
    rankRequests(requestsToRank = this.requests) {
        if (!requestsToRank || requestsToRank.length === 0) {
            return [];
        }

        return requestsToRank.sort((a, b) => {
            if (b.importanceScore !== a.importanceScore) {
                return b.importanceScore - a.importanceScore;
            }
            const timeA = new Date(a.createdAt).getTime();
            const timeB = new Date(b.createdAt).getTime();
            return timeA - timeB;
        });
    }

    /**
     * Filters the cached requests by source and then ranks them.
     */
    getRankedRequestsBySource(source) {
        const normalizedSource = source.toLowerCase();

        if (!this.validSources.includes(normalizedSource)) {
            console.warn(`Source "${source}" is not recognized.`);
            return [];
        }

        const filteredRequests = this.requests.filter(
            (request) => request.source.toLowerCase() === normalizedSource
        );

        return this.rankRequests(filteredRequests);
    }

    /**
     * Orchestrator method to fetch, rank, and return the complete list.
     */
    async getAllRankedRequests() {
        await this.fetchRequests();
        return this.rankRequests();
    }
}
