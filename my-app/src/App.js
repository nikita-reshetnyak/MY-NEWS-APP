import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import NewsList from './components/NewsList/NewsList';
import NewsDetail from './components/NewsDetail/NewsDetail'
import Contacts from './components/Contacts/Contacts';
import './styles/global.scss';
import './styles/nullstyle.scss';
import axios from 'axios';
import Footer from './components/Footer/Footer';

const App = () => {
  //todo функция для запроса на сервер
  const useFetch = () => {
    const [data, updateData] = useState(null);
    const requestUrl = 'https://newsapi.org/v2/everything?q=Apple&from=2021-11-01&sortBy=popularity&apiKey=e2a6d18b7359459485160f817fcc4a95';
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.get(requestUrl);
        updateData(response.data.articles)
      }
      fetchData()
    }, [])
    return data
  }

  const result = useFetch();


  return (
    <div className="App">
      <Header />
      <Route path="/" exact render={() => <Home news={result} />} />
      <Route path="/NewsList" exact render={() => <NewsList news={result} />} />
      <Route path="/Contacts" exact component={Contacts} />
      <Route path="/NewsList/:name" exact component={NewsDetail} />
      <Footer />
    </div>

  );
}

export default App;
