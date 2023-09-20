//this file is under development
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { Button } = wp.components;

registerBlockType('contentful/series-info', {
    title: 'Contentful Series Info',
    icon: 'format-image',
    category: 'common',
    attributes: {
        seriesTitle: {
            type: 'string',
            default: ''
        },
        seriesYear: {
            type: 'number',
            default: ''
        },
        seriesDescription: {
            type: 'string',
            default: ''
        },
        seriesPoster: {
            type: 'string',
            default: ''
        }
    },
    edit: function(props) {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1 0 33%', marginRight: '16px' }}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => props.setAttributes({ seriesPoster: media.url })}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open}>
                                    <img src={props.attributes.seriesPoster} alt="Upload Series Poster" />
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                </div>
                <div style={{ flex: '1 0 66%' }}>
                    <RichText
                        tagName="h2"
                        value={props.attributes.seriesTitle}
                        onChange={(value) => props.setAttributes({ seriesTitle: value })}
                        placeholder="Enter Series Title"
                    />
                    <RichText
                        tagName="p"
                        value={props.attributes.seriesYear}
                        onChange={(value) => props.setAttributes({ seriesYear: value })}
                        placeholder="Enter Series Year"
                    />
                    <RichText
                        tagName="p"
                        value={props.attributes.seriesDescription}
                        onChange={(value) => props.setAttributes({ seriesDescription: value })}
                        placeholder="Enter Series Description"
                    />
                </div>
            </div>
        );
    },
    save: function(props) {
        return (
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1 0 33%', marginRight: '16px' }}>
                    <img src={props.attributes.seriesPoster} alt="Series Poster" />
                </div>
                <div style={{ flex: '1 0 66%' }}>
                    <h2>{props.attributes.seriesTitle}</h2>
                    <p>{props.attributes.seriesYear}</p>
                    <p>{props.attributes.seriesDescription}</p>
                </div>
            </div>
        );
    }
});
