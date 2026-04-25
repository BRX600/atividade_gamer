/* 
  1º Imports → onde trazemos tudo que vamos usar
  2º export default → componente principal do app
  3º variáveis/estados → dados que mudam durante o uso
  4º funções → ações do app (tirar foto, postar, etc)
  5º return → o que aparece na tela
  6º StyleSheet → estilos (visual do app)
*/

/* ===== 1º IMPORTS ===== */

// Importando o React e o useState (serve pra guardar dados que mudam)
import React, { useState } from 'react';

// Importando componentes visuais do React Native (tipo HTML do mobile)
import {
  View,              // funciona como uma <div>
  Text,              // usado para textos
  StyleSheet,        // para criar estilos (tipo CSS)
  TextInput,         // campo de digitação
  TouchableOpacity,  // botão clicável
  Image,             // mostrar imagens
  FlatList,          // lista otimizada (tipo feed)
} from 'react-native';

// Importando biblioteca para acessar a câmera do celular
import * as ImagePicker from 'expo-image-picker';


/* ===== 2º COMPONENTE PRINCIPAL ===== */

// Essa é a função principal do app (tudo começa aqui)
export default function App() {

  /* ===== 3º ESTADOS ===== */

  // Guarda o nome digitado pelo usuário
  const [nome, setNome] = useState('');

  // Guarda a foto tirada (começa vazio)
  const [foto, setFoto] = useState(null);

  // Guarda todos os posts (lista/feed)
  const [posts, setPosts] = useState([]);


  /* ===== 4º FUNÇÕES ===== */

  // Função para tirar foto
  async function tirarFoto() {

    // Pede permissão para usar a câmera
    const permissao = await ImagePicker.requestCameraPermissionsAsync();

    // Se o usuário negar, mostra aviso e para tudo
    if (!permissao.granted) {
      alert("Permissão negada");
      return;
    }

    // Abre a câmera do celular
    const resultado = await ImagePicker.launchCameraAsync();

    // Se o usuário NÃO cancelou a foto
    if (!resultado.canceled) {

      // Salva o caminho da imagem no estado "foto"
      setFoto(resultado.assets[0].uri);

      /*
        Explicando:
        resultado → objeto com dados da foto
        assets[0] → primeira imagem capturada
        uri → caminho da imagem no celular
      */
    }
  }


  // Função para postar no feed
  function postar() {

    // Verifica se o usuário digitou nome e tirou foto
    if (nome === "" || foto === null) {
      alert("Digite o nome e tire uma foto!");
      return;
    }

    // Criando um novo post
    const novoPost = {
      id: Date.now().toString(), // ID único baseado no tempo
      nome: nome,                // nome do usuário
      imagem: foto               // foto tirada
    };

    // Adiciona o novo post no início da lista
    setPosts([novoPost, ...posts]);

    // Limpa os campos após postar
    setNome("");
    setFoto(null);
  }


  // Função que desenha cada item da lista (cada post)
  function renderizarItem({ item }) {
    return (
      <View style={styles.card}>
        
        {/* Nome do usuário */}
        <Text style={styles.usuario}>
          {item.nome}
        </Text>

        {/* Imagem do post */}
        <Image
          source={{ uri: item.imagem }}
          style={styles.imagemFeed}
        />
      </View>
    );
  }


  /* ===== 5º RETURN (TELA) ===== */

  return (
    <View style={styles.container}>
      
      {/* Título */}
      <Text style={styles.titulo}>Meu Feed</Text>

      {/* Campo para digitar o nome */}
      <TextInput
        style={styles.input}
        placeholder="Digite o seu nome"
        value={nome}              // valor atual
        onChangeText={setNome}    // atualiza o estado
      />

      {/* Botão para tirar foto */}
      <TouchableOpacity style={styles.botao} onPress={tirarFoto}>
        <Text style={styles.textoBotao}>Tirar foto</Text>
      </TouchableOpacity>

      {/* Mostra a foto tirada (preview) se existir */}
      {
        foto && (
          <Image
            source={{ uri: foto }}
            style={styles.preview}
          />
        )
      }

      {/* Botão para postar */}
      <TouchableOpacity
        style={styles.botaoPostar}
        onPress={postar}
      >
        <Text style={styles.textoBotao}>Postar</Text>
      </TouchableOpacity>

      {/* Lista de posts (feed) */}
      <FlatList
        data={posts}                          // dados da lista
        keyExtractor={(item) => item.id}      // chave única
        renderItem={renderizarItem}           // como renderizar
      />

    </View>
  );
}


/* ===== 6º STYLE (VISUAL DO APP) ===== */

// Aqui ficam os estilos (tipo CSS)
const styles = StyleSheet.create({

  // Container principal
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f0f1a', // fundo escuro estilo gamer
  },

  // Título
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
    color: '#00ffff', // azul neon
    textShadowColor: '#8a2be2', // brilho roxo
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10, // efeito glow
  },

  // Campo de texto
  input: {
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#8a2be2',
  },

  // Botão tirar foto
  botao: {
    backgroundColor: '#8a2be2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 10,
  },

  // Texto dos botões
  textoBotao: {
    fontWeight: 'bold',
    color: '#fff',
  },

  // Preview da imagem
  preview: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#00ffff',
  },

  // Botão postar
  botaoPostar: {
    backgroundColor: '#00ff88',
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 10,
  },

  // Card do post
  card: {
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00ffff',
  },

  // Nome do usuário
  usuario: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#00ffff',
  },

  // Imagem no feed
  imagemFeed: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#8a2be2',
  }
});
