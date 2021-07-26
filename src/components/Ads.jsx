import React, { useState, useEffect } from 'react'
import { getAds, getAdsByCategories } from '../api/ads'
import Pagination from './Pagination';
import Ad from './Ad'
import Category from '../components/Category';
const Ads = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(2);

  useEffect(() => {
    const fetchAds = async () => {
      setLoading(true);
      const res = await getAds()
      const { data } = res;
      if (data.length === 0) return setAds([])
      setAds(data);
      setLoading(false);
    };

    fetchAds();
  }, []);

  const getByCategories = async (category) => {
    const payload = {
      category
    }
    const result = await getAdsByCategories(payload)
    setAds(result.data)
  } 

  // Get current ads
  const indexOfLastAds = currentPage * adsPerPage;
  const indexOfFirstAds = indexOfLastAds - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAds, indexOfLastAds);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='container mt-5'>
      <Category cat={getByCategories}/>
      <Ad ads={currentAds} loading={loading} />
      <Pagination
        adsPerPage={adsPerPage}
        totalAds={ads.length}
        paginate={paginate}
      />
    </div>
  );
}

export default Ads
