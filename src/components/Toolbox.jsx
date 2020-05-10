import videojs from 'video.js'
import '!style-loader!css-loader!video.js/dist/video-js.css'
import { Link } from 'react-router-dom';

var setLinkObject = (path , list)=>{
    return {
        pathname: `/${path}`,
        state:list
    }
};

function VideoBox(props) {
    const { clickEvent, isCollection } = props;
    const heartClass = isCollection ? "fa-heart " : "fa-heart-o";
    const publishedAt = props.publishedAt.replace("T"," ");
    
    const obj = {
        title: props.title,
        description:props.description,
        id:props.id,
        publishedAt:publishedAt.substring(0 , publishedAt.indexOf("."))
    };
    return (
        <div className="videoBox">
            <div className="video-preview">
                <img src={props.imgUrl} />
                <div className="collections" onClick={(e) => { clickEvent(e, props.id) }}>
                    <i className={`fa ${heartClass} fa-2x`}></i>
                </div>
                <div className="video-length">
                    {props.duration}
                </div>
                <Link to={setLinkObject('video',obj)}>
                    <span className="playIcon">
                        <svg width="15" height="19" viewBox="0 0 15 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.9.9l13.2 8.6L.9 18.1z" fill="#000A47" fillRule="nonzero"></path>
                        </svg>
                    </span>
                </Link>
                

            </div>
            <section>
                <h3 className="video-title">
                    {props.title}
                </h3>
                <p className="video-content">
                    {props.description}
                </p>
            </section>
        </div>
    );
}

export { VideoBox }

function TabButton(props) {
    const { id, clickEvent, isClick } = props;
    let btnContent = null;
    const activeClass = isClick ? "active" : "";
    switch (id) {
        case "right":
        case "left":
            btnContent = <i className={`fa fa-angle-double-${id}`}></i>;
            break;
        default:
            btnContent = id
            break;
    }
    return <li className={`tab ${activeClass}`} onClick={(e) => { clickEvent(e, id) }}>
        <a >{btnContent}</a>
    </li>
}

function TabGroup(props) {
    const { count, clickEvent, activeID } = props;
    let btnList = [];
    for (let i = 0; i < count; i++) {
        const isClick = parseInt(activeID) === i + 1;
        btnList[i] = <TabButton key={`tabBtn-${i}`} id={`${i + 1}`} isClick={isClick} clickEvent={clickEvent} />
    }
    return <ul className="tabGroup">
        <TabButton id="1" clickEvent={clickEvent} />
        <TabButton id="left" clickEvent={clickEvent} />
        {btnList}
        <TabButton id="right" clickEvent={clickEvent} />
        <TabButton id={`${count}`} clickEvent={clickEvent} />
    </ul>
}

export { TabGroup }

function TabGroupmMobile(props) {
    const { count, clickEvent, activeID } = props;
    let btnList = [];
    for (let i = 0; i < count; i++) {
        const isClick = parseInt(activeID) === i + 1;
        btnList[i] = <TabButton key={`tabBtn-${i}`} id={`${i + 1}`} isClick={isClick} clickEvent={clickEvent} />
    }
    return <ul className="tabGroup moblie">
                <TabButton id="1" clickEvent={clickEvent} />
                <TabButton id="left" clickEvent={clickEvent} />
                <div className="tab-select" >{`${activeID} of ${count}`}</div>
                <TabButton id="right" clickEvent={clickEvent} />
                <TabButton id={`${count}`} clickEvent={clickEvent} />
            </ul>
}

export { TabGroupmMobile }

class VideoPlayer extends React.Component {
    //mounting
    constructor(props) {
        super(props);

        this.videoNode = React.createRef();
        this.player = null


    }


    render() {
        return  <div className="videoPlayer-border">
                    <div >
                        <video ref={node => this.videoNode = node} className="video-js "></video>
                    </div>
                </div>;
    }
    //mounting 
    componentDidMount() {
        this.player = videojs(this.videoNode, this.props, function OnPlayReady() {
            console.log("OnPlayReady", this);
        });

    }

    //unmount
    componentWillUnmount() {
        console.log(" Unmounting");
        if (this.player) {
            this.player.dispose();
        }
    }
}

export { VideoPlayer }