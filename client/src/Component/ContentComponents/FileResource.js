import { FileIcon, defaultStyles } from 'react-file-icon';
import { useState } from 'react';
const FileResource = ({ file }) => {
    const [extension, setExtension] = useState(file.Resource.split('.').pop());
    return (
        <div className="mb-3">
            <div className="desc d-flex align-items-center">
                <a href={file.Resource} target='_blank' className="d-flex align-items-center file-link" style={{ cursor: 'pointer' }}>
                    <FileIcon extension={extension} {...defaultStyles[extension]} />
                    <h5 className="ms-3 mt-auto mb-auto">{file.Name}</h5>
                </a>
            </div>
        </div>
    );
}

export default FileResource;