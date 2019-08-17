import { ICreditsTypeMapper } from "../typings";

const getCreditsNameById = (creditsType: number): string => {
    const result = ICreditsTypeMapper.filter(item => item.id === creditsType);
    return result.length === 1 ? result[0].text : "无";
};

export default getCreditsNameById;
