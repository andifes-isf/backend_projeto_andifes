import Languages from "./languages";

class LanguageFactory {
    getLanguage(language) {
        if(Languages.languages.indexOf(language) == -1) {
            return null
        } else {
            return language
        }
    }
}

export default new LanguageFactory()