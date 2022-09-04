import './App.css';

import logo from './imagens/logo.png'

import imgCampo from './imagens/paisagem.jpg'

import { GrChapterPrevious,GrChapterNext } from 'react-icons/gr';
import { BiSearchAlt } from 'react-icons/bi';

import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export default function Main (){
    const [listaDex, setListaDex] = useState([])  
    const [lista, setLista] = useState([])  
    const [select,setSelect]= useState()

    useEffect(() => {getList()}, [])

    const getList = async () => {
        await fetch(
            "https://pokeapi.co/api/v2/pokedex/kanto/"
          ).then((response) => response.json()).then(responce => {
           setListaDex(responce.pokemon_entries.map((val) => {
            return{
                numero: val.entry_number, nome: val.pokemon_species.name, url: val.pokemon_species.url
            }
           }))

           let list =[]
           responce.pokemon_entries.map((val) => {
          list.push(val.pokemon_species.name)
           })

           setLista(list)
          })
    }


   function srcPokemon (){
      
        listaDex.filter((val) => {
            if(select == val.nome){
              getPokemon(val.url)
            }
            
        })
        
   } 
   
   const getPokemon = async (url) => {
        await fetch (url).then(response => response.json()).then(response => {
            console.log(response)
        })
   }

    return (
    <div className='Main'>
        <div className='Header'>
           <div className='imagemLogo'>
                <img src={logo} className='logo'></img>
            </div>

            <div className='contatos'>
                <span>Home</span>
                <span>Contatos</span>
            </div>
        </div>

        <div className='mainDex'>
            <div className='pokedex'>
                <div className='headerPokedex'>
                    <div className='relevo'></div>
                </div>
                <div className='tela'>
                    <div className='paisagem'>
                        <img src={imgCampo} className='imagemPokemon'></img>
                       
                        <div className='nomePokemon'>
                            <span>pikachu</span>
                        </div>
                    </div>
                </div>
                <div className='footerPokedex'>
                    <div className='srcPokemon'>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={lista}
                            sx={{ width:'80%' }}
                            renderInput={(params) => <TextField {...params} label="Pokemon" />}
                            
                            onSelectCapture={(t)=>setSelect(t.target.value)}
                        />

                        <a href='#' onClick={() => srcPokemon()}>
                            <BiSearchAlt className='iconSrc'></BiSearchAlt>
                        </a>
                    </div>    
                <div className='button'> 
                        <div className='buttonNP'>
                            <a href='#' >
                                <GrChapterPrevious className='iconButton' ></GrChapterPrevious>                   
                            </a>
                        </div>    

                        <div className='buttonNP'>
                            <a href='#'>
                                <GrChapterNext className='iconButton'></GrChapterNext>
                            </a>
                        </div>    
                </div>    
                </div>

            </div>
            <div className='pokedexInf'>
                <div className='dobradissa'></div>
                <div className='dobradissa2'></div>
                <div className='telaInf'>
                    <div className='typeInf'>
                        <div className='nomeInf'>
                            <span>Nome:</span>
                        </div> 
                        <div className='tipoInf'>
                            <span>tipo:</span>
                        </div>
                        <div className='evoluçãoInf'>
                            <span>evoluções:</span>
                        </div>
                        <div className='dadosInf'>
                            <span>Especie:</span>
                            <span>Habilidade:</span>
                            <span>Altura:</span>
                            <span>Habilidade:</span>                          
                        </div>
                        <div className='regiãoInf'>
                            <span>região</span>
                        </div>
                    </div>
                    <div className='telaInfButton'></div>
                </div>
            </div>
        </div>


        
    </div>
    )
}
