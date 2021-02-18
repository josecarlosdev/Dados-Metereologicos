import React, { useState, useEffect } from 'react'
import axios from 'axios'

const  Metereologicos = () => {


    const [getCity, setGetcity] = useState([])
    const [uf, setUf] = useState('AC');
    const [listUf, setListUf] = useState([]);
    const [city, setCity] = useState();
    const [listCity, setListCity] = useState([]);

    const loadUf = () => {
        let url = 'https://servicodados.ibge.gov.br/';
        url = url + 'api/v1/localidades/estados';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListUf([...data]);
            });
    }
    const loadCity = (id) => {
        let url = 'https://servicodados.ibge.gov.br/api/v1/';
        url = url + `localidades/estados/${id}/municipios`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.sort((a, b) => a.nome.localeCompare(b.nome));
                setListCity([...data]);
            });
    }
    
    useEffect(() => {
        loadUf();
    }, []);
    useEffect(() => {
        if (uf) {
            loadCity(uf);
        }
    }, [uf]);


    const load = async () => {
        const result = await axios.get('http://localhost:3002/temp');
        setGetcity(result.data);
        console.log(result)
    }
  
    useEffect(() => {
        load();

    }, [])
    const LoadOnclick = ()=>{

            setTimeout(() =>{
                alert('Busca realizada com sucesso')
                window.location.reload();
            },1000)
        
    }

    return (
        <div className="container">
            <form action="http://localhost:3002/cidades" method="post">
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="title">UF</label>
                            <select className="form-control"
                                value={uf}
                                onChange={e => setUf(e.target.value)}
                            >
                                {listUf.map((a, b) => (
                                    <option
                                        value={a.id}

                                    >{a.sigla} - {a.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="title">Cidade</label>
                            <select
                                className="form-control"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                name="txtNome"
                                id="txtNome"
                            >
                                {listCity.map((a, b) => (
                                    <option

                                        value={a.sigla}>{a.nome}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                                    <br/>

                            <button 
                                type='submit' 
                                className="btn btn-dark"
                                onClick = {LoadOnclick}
                               
                            >Buscar</button>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <ul className="list-group">
                        {getCity.map(p => (
                            <li className="list-group-item" key={p.id}>
                                {p.name}
                            </li>
                        ))}

                    </ul>
                </div>
            </form>
        </div>


    );
}

export default Metereologicos;
