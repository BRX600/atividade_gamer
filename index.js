/* 
  1º Imports;
  2º export default;
  3º variáveis e constantes;
  4º funções;
  5º return;
  6º StyleSheet.
*/

import React, {
  useState,
} from 'react'; /* importando componentes da biblioteca react */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native'; /* importando componentes da biblioteca react-native */

import * as ImagePicker from 'expo-image-picker'; /* importando componentes da biblioteca expo-image-picker*/

/* iniciando a função padrão que será chamada na renderização do aplicativo */
export default function App() {
  const [nome, setNome] = useState(''); /* criando um estado para o nome */
  const [foto, setFoto] = useState(null); /* criando um estado para a foto */
  const [posts, setPosts] = useState([]); /* criando um estado para os posts */

  async function tirarFoto() {

    /* Pegar autirazação do usuário para usar a camera */
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    /* Verificando se permissão foi concedida */
    if(!permissao.granted) {
      alert("Permissão negada");
      return;
    }

    /* Carregando a camera */
    const resultado = await ImagePicker.launchCameraAsync();

    /* Verficicando se a operação foi cancelada caso não salva a variável foto */
    if(!resultado.canceled){
      setFoto(resultado.assets[0].uri);
      /* 
        resultado -> variável que guarda todos os     atributos da foto que foi tirada
        resultado.assets[0] -> atributo da variável resultado que contem o valor da foto
        resultado.assets[0].uri -> caminho e conteúdo da onde a variável foi salva
      */
    }
  }

  /* Função para postar a foto no feed*/
  function postar(){
    /* Verificar se existe nome e foto carregados */
    if(nome === "" || foto === null) {
      alert("Digite o nome e tire uma foto!");
      return;
    }

    /* Criando o novo Post */
    const novoPost = {
      id: Date.now().toString(),
      nome: nome,
      imagem: foto
    };

    /* Salvando o post */
    setPosts([novoPost, ...posts]);

    /* Retornando as variaveis de nome e foto para seu padrão original */
    setNome("");
    setFoto(null);
  }

  function renderizarItem ({item}){
    return(
      <View style={styles.card}>
        <Text style={styles.usuario}>
          {item.nome}
        </Text>
        <Image 
          source={{uri: item.imagem}}
          style={styles.imagemFeed}
        />
      </View>
    )
  }

  /* Onde ocorre a renderização */
  /* Só aceita uma View por return */
  return (
    <View style={styles.container}>
      {' '}
      {/* View é a div do react */}
      <Text style={styles.titulo}> Meu Feed </Text> {/* usado para escrer textos.
      Textos fora do Text são consideros erros!! */}
        {/* placeholder é o texto que fica preenchido quando não há valor no input */}
        {/* valor que o input tem */}
        {/* Chamada quando ocorre atualização de textos no input e chama a função setNome */}
      <TextInput
        style={styles.input}
        placeholder="Digite o seu nome"
         value={
          nome
        } 
        onChangeText={
          setNome
        } 
      />{' '}
      {/* São tags para inserir valores. */ /* Criar um Botão para tirar foto */}
      <TouchableOpacity style={styles.botao} onPress={tirarFoto}>
        <Text style={styles.textoBotao}>Tirar foto</Text>
      </TouchableOpacity>

      {/* Verifica se há fotos carregadas se há mostra o preview da foto */}
      {
        foto && (
          <Image 
            source={{uri:foto}}
            style={styles.preview}
          />
        )
      }

      {/* Botão de postar */}
      <TouchableOpacity
        style={styles.botaoPostar}
        onPress={postar}
      >
        <Text style={styles.textoBotao}> Postar </Text>
      </TouchableOpacity>

      {/* Lista de Posts (Feed)*/}
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
      />
    </View>
  );
}

{/* inicia o StyleSheet */}
// estilos do app (tema gamer RGB)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f0f1a', // fundo escuro estilo setup gamer
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#00ffff', // azul neon
    textShadowColor: '#8a2be2', // brilho roxo
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // efeito glow (tipo LED)
  },

  input: {
    backgroundColor: '#1a1a2e', // fundo do campo
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: '#fff', // texto branco
    borderWidth: 1,
    borderColor: '#8a2be2', // borda roxa neon
  },

  botao: {
    backgroundColor: '#8a2be2', // botão roxo RGB
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 10, // sombra (Android)
  },

  textoBotao: {
    fontWeight: 'bold',
    color: '#fff', // texto branco
  },

  preview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#00ffff', // borda azul neon
  },

  botaoPostar: {
    backgroundColor: '#00ff88', // verde destaque (ação)
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 10,
  },

  card: {
    backgroundColor: '#1a1a2e', // fundo do post
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00ffff', // borda neon
  },

  usuario: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#00ffff', // nome em azul neon
  },

  imagemFeed: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8a2be2', // borda roxa na imagem
  }
});