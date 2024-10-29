import EmailDomain from "./emailDomain";

class EmailDomainFactory {
    getDomain(domain) {
        if(EmailDomain.domains.indexOf(domain) == -1) {
            return null
        } else {
            return domain
        }
    }
}

export default new EmailDomainFactory()