import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spiner from './Spiner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }

    //for capital first leter in category 
    capitalFirstLeter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalFirstLeter(this.props.category)} -- NewsMonkey`
    }

    async updateNews() {
        let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b77218a7b3f64ce69e8ed042409f05c6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(apiUrl);
        let parsedata = await data.json();
        console.log(parsedata);
        this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
            loading: false
        })
    }

    async componentDidMount() {
        this.updateNews();
    }


    handlePrevClick = async () => {
        console.log("prev clicked")
        this.setState({
            page: this.state.page - 1
        });
        this.updateNews()

    }

    handleNextClick = async () => {
        console.log("Next clicked")
        // if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        // }
        // else{
        //     let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b77218a7b3f64ce69e8ed042409f05c6&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading:true});
        //     let data   = await fetch(apiUrl); 
        //     let parsedata = await data.json();            
        //     this.setState({
        //         page:this.state.page + 1,
        //         articles: parsedata.articles,
        //         loading:false
        //     })
        // }
        this.setState({
            page: this.state.page + 1
        });
        

    }

    
    fetchMoreData = async () => {
       this.setState({
           page: this.state.page + 1
       });

       let apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b77218a7b3f64ce69e8ed042409f05c6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(apiUrl);
        let parsedata = await data.json();       
        this.setState({
            articles: this.state.articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
            loading: false
        })
    }

    render() {
        return (

           <>
                <h2 className="my-5 text-center">NewsMonkey - Top {this.capitalFirstLeter(this.props.category)} Headlines</h2>
                {/* {this.state.loading && <Spiner />} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spiner />}
                >
                     <div className="container mt-5">
                         <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem description={element.description ? element.description.slice(0, 88) : ""} title={element.title ? element.title.slice(0, 45) : ""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })}

                    </div>

                                                                     {/* old code for next prev btns */}
                    {/* <div className="container mt-5">
                         <div className="row">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem description={element.description ? element.description.slice(0, 88) : ""} title={element.title ? element.title.slice(0, 45) : ""} imgUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source.name} />
                            </div>
                        })} */}

                    </div>
                    </InfiniteScroll>
                    </>
                   
                        
               
                //  <div className="container d-flex justify-content-between my-5">
                //     <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                //     <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&rarr; Next</button>
                // </div>  
              
           
            
        )
    }
}

