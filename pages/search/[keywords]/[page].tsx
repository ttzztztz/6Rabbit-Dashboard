import dynamic from "next/dynamic";

export default dynamic(import("../../../containers/Search"), {
    ssr: false
});
