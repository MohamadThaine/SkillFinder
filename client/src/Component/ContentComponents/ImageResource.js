const ImageResource = ({ img }) => {
    return (
        <div className="mb-3 desc text-center">
            <img src={img.Resource} alt={img.Name} style={{ maxHeight: '50rem', maxWidth: '100%' }} />
            <h3>{img.Name}</h3>
        </div>
    )
}

export default ImageResource;