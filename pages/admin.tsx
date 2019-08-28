import dynamic from "next/dynamic";

export default dynamic(import("../containers/Admin"), {
    ssr: false
});
