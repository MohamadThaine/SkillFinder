import FileResource from "./FileResource"
import ImageResource from "./ImageResource"
import LinkResource from "./LinkResource"
import TextResource from "./TextResource"
import VideoResource from "./VideoResource"

const Resource = ({ resource }) => {
    if(resource.Type === 'video')
    return <VideoResource video={resource} />
    else if(resource.Type === 'link')
    return <LinkResource link={resource} />
    else if(resource.Type === 'picture')
    return <ImageResource img={resource} />
    else if(resource.Type === 'file')
    return <FileResource file={resource} />
    else
    return <TextResource text={resource} />
}

export default Resource;