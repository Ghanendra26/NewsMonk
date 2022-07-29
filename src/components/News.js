import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps={
        country:'in',
        pageSize: 6,
        category: 'general'
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,



    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    constructor(props){
        super(props) 
        this.state=({
           articles:[],
           loading: false,
           page:1 ,
           totalResults:0
        
           
        }
       
        )
        document.title=`${this.capitalizeFirstLetter(this.props.category)}- NewsMonk`
        
    }
     
    async updateNews(){
        this.props.setprogress(15);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=47b64a925d2f41ff8794e31e3c6a29c8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data= await fetch(url);
        this.props.setprogress(30);
        let parsedData = await data.json();
        this.props.setprogress(60);
        
        this.setState({articles:parsedData.articles,
                       totalResults:parsedData.totalResults,
                       loading:false })
        this.props.setprogress(100);

    }
    

    async componentDidMount(){
       this.updateNews()
    }
    //  handlePrevClick= async()=>{
       
    //     this.setState({page: this.state.page -1})
    //     this.updateNews()

    // }
    // handleNextClick= async()=>{
        
    //     this.setState({page:this.state.page +1})
    //     this.updateNews()
        

    // }
    fetchMoreData = async () => {
        this.setState({page: this.state.page+1})
          const    url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=47b64a925d2f41ff8794e31e3c6a29c8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            
       
        let data= await fetch(url);
        let parsedData = await data.json();
        
        this.setState({
                       articles:this.state.articles.concat(parsedData.articles),
                       totalResults:parsedData.totalResults,
                       loading:false })
                    };


            

        
       

    render() {
        return (
            <>
                  <div className="container text-center ">
                <h1 className='text-center'style={{ marginTop: '80px' }}>NewsMonk - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1></div>
                {this.state.loading &&<Spinner/>}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
               <div className="container">
                <div className="row my-3">
                {
                    this.state.articles.map((element)=>{
                            return  <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                    
                        })
                    }
                    {/* <div className="container d-flex justify-content-between">
                        <button type='button' disabled={this.state.page<=1} onClick={this.handlePrevClick} className="btn btn-dark"> &larr; Previous</button>
                        <button type='button' disabled={this.state.page +1 >Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} className="btn btn-dark">Next &#8594; </button>
                    </div> */}
               
                    
                   
                </div>
                </div>
                </InfiniteScroll>
                </>
                 
            
            
        )
     
    }
}
