import getCreditsNameById from "./CreditsName";

const renderCredits = (creditsType: number, credits: number, format: string = "%s %d") => {
    const creditsName = getCreditsNameById(creditsType);
    const creditsNumber = creditsType === 3 ? (credits / 100.0).toFixed(2) : credits;

    return format.replace(/%s/g, creditsName).replace(/%d/g, creditsNumber.toString());
};

export default renderCredits;
