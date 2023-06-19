import HtmlContent from "../HtmlContent";

const TextResource = ({ text }) => {
    return (
        <div className="desc mb-3">
            <h3 className="text-center">{text.Name}</h3>
            <HtmlContent htmlContent={text.Resource} />
        </div>
    )
}

export default TextResource;