const ZoteroClient = require('zotero-translation-client');
const Cite = require('citation-js');


const zConfig = {
    persist: false,
    translateURL: require('./../../config/API.config').translateURL
}

const formatOutput = (citation, format='html', template='apa', lang="en-US") => {
    return citation.format('bibliography', {
        format,
        template,
        lang
    });
}

const isLikeURL = identifier => {
	return !!identifier.match(/^(https?:\/\/)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b(\S*)$/i);
};


module.exports = {
    handleSearch: async (req, res, next) => {
        try {
            let translationClient = new ZoteroClient(zConfig);
            const { query: { searchEntry }} = req;
            let citation, output;

            if (isLikeURL(searchEntry)){
                const { items: [ EntryInfo ] } = await translationClient.translateUrl(searchEntry);
                citation = await new Cite(EntryInfo);
                output = await formatOutput(citation);
            } else {
                const { items: [ EntryInfo ] } = await translationClient.translateIdentifier(searchEntry);
                citation = await new Cite(EntryInfo);
                output = await formatOutput(citation);
            }

            res.status(200).send(output);
            next()
        } catch (error){
            console.log(error);
            next();
        }
    },


}