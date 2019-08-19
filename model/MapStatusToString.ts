const mapStatusToString = (status: -1 | 0 | 1): string => {
    switch (status) {
        case -1:
            return "审核失败";
        case 0:
            return "审核中";
        case 1:
            return "审核成功！";
        default:
            return "";
    }
};

export default mapStatusToString;
