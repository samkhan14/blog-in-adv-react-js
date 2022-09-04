import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let {title, description, imgUrl, newsUrl, author , date, source} = this.props
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={!imgUrl?"https://image.cnbcfm.com/api/v1/image/106984394-1638559231655-gettyimages-1357001627-dsc07200_dd4f75e9-1a1f-48f9-a29e-2a1bfc923fcb.jpeg?v=1638559311":imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                    <span className="badge rounded-pill bg-success">{source}</span>
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted"> By {!author?"Uknown": author} on {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} className="btn btn-sm btn-dark">Read More</a>
                    </div>
                    </div>
            </div>
        )
    }
}
