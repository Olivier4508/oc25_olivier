# TP2

## 1.2 Qwen

### 1.2.1 Qwen/Qwen3-0.6B-Base

Nous étudions d'abord un modèle LLM brut, dont l'identifiant modèle est : `Qwen/Qwen3-0.6B-Base`

1. Expliquer les différents parties de l'identifiant. Pourquoi utilisons-nous la version `0.6B` dans ce TP ?
2. Tester le code ci-dessous. Que fait-il ?
3. Commenter chaque ligne du code pour comprendre son rôle.
4. Tester différents prompts.
5. Changer le paramètre `temperature`. Qu'est-ce que vous observez ? Que fait concrètement ce paramètre ?
6. Et si vous remplacez l'argument `temperature` par `do_sample=False` et que vous exécutez le bloc le deux fois de suite ?

#### Réponses :

1. L’identifiant suit la convention des modèles publiés sur la plateforme Hugging Face. Qwen :
  C’est le nom de l’organisation qui publie le modèle.
  Il s’agit de l’équipe de recherche de Alibaba Cloud, qui développe la famille de
  modèles Qwen.

Qwen3 :
  Indique la version majeure de la famille de modèles.
  Ici, c’est la troisième génération des modèles Qwen, avec des améliorations
  architecturales et d’entraînement par rapport aux versions précédentes.
  
0.6B :
  Signifie 0.6 billion, donc 600 millions de paramètres.
  C’est la taille du modèle.
  
Base :
  Indique que c’est la version pré-entraînée brute (non fine-tunée pour le dialogue ou
  les instructions).
  Elle n’a pas été optimisée avec du RLHF ou des instructions conversationnelles.

  Pourquoi utiliser la version 0.6B? Car elle est beaucoup plus légère qu'une version 7B
  ou 14B par exemple, ce qui permet de faire tourner ce modèle rapidement sur des
  ordinateurs pas très puissants.

2. On crée une fonction avec pipeline() nommée gen, à laquelle on peut passer du texte et
   un nombre de tokens, que l'IA essaiera de compléter.

3. `from transformers import pipeline, AutoTokenizer`
   `import torch`

   Ce code importe les bibliothèques pipeline (permet d’utiliser facilement un modèle
   pour une tâche (ici : génération de texte)), AutoTokenizer (charge automatiquement
   le tokenizer adapté au modèle) et torch (bibliothèque PyTorch, utilisée pour exécuter
   le modèle.)

   `model_id = "Qwen/Qwen3-0.6B-Base"`

   On indique quel modèle on veut charger depuis Hugging Face :
   la version 600 millions de paramètres de la famille Qwen.

   `tokenizer = AutoTokenizer.from_pretrained(model_id)`

   Cette ligne télécharge le tokenizer associé au modèle. Le tokenizer sert à transformer
   le texte en tokens, permettre au modèle de comprendre l’entrée, et reconvertir les
   tokens générés en texte lisible.

   `gen = pipeline(`
     `"text-generation",`
     `model=model_id,`
     `tokenizer=tokenizer,` 
     `device="mps",`
     `torch_dtype=torch.float32`
   `)`

   Cette partie crée un objet gen qui permet de générer du texte facilement.
   Paramètres :
     "text-generation" :
   tâche utilisée : génération auto-régressive.

   model=model_id :
    charge le modèle Qwen 0.6B.

   tokenizer=tokenizer :
    associe le tokenizer chargé précédemment.

   device="mps" :
     utilise le backend Apple Silicon GPU (Metal Performance Shaders).

   torch_dtype=torch.float32 :
     précise le type numérique utilisé pour les calculs (32 bits flottants).
4.

5. Quand je change le paramètre température la réponse du modèle change, si je mets 2 par
   exemple il ajoute des mots très aléatoirement, alors que si je mets 0.1 il répète la
   même réponse beaucoup de fois.
   
   Concrètement, ce paramètre change le niveau de risque que va prendre l'IA lorsqu'il
   décide du prochain token. (0 à 2 ou du moins risqué au plus).

6. Il répond exactement la même chose à chaque fois.

### 1.2.2 Qwen/Qwen3-0.6B

Nous utilisons maintenant la version sans `Base` de `Qwen3-0.6B-Base`.

1. Que signifie ce changement dans l'identifiant ?
2. Tester le code ci-dessous. Qu'est-ce que est différent ?
3. Commenter les nouvelles lignes pour expliquer leurs rôles ?
3. Tester différents `content` pour `user`.
4. Décommenter les lignes `system`. Tester différents `content`. 
5. Analysez le contenu du prompt. Quels sont ses différents éléments et que veulent-ils dire ? 
6. Et que se passe-t-il si vous remplacez le `prompt` par une question ou un texte quelconque ?
7. Que se passe-t-il avec `enable_thinking=True` ?

#### Réponses :

1. Ca veut dire qu'on n'utilise plus la version brute (Base) du modèle mais une version instruction-tuned (fine-tunée pour suivre des instructions).

Elle est optimisée pour répondre à des questions, suivre des consignes, respecter un format dialogue (system, user, etc.), et produire des réponses plus utiles et structurées

2. Il y a un objet messages et l'objet prompt est plus grand qu'avant.

3. `messages = [
   {"role": "system", "content": "You only answer with one word."},
   {"role": "system", "content": "You are a cowering scared wimp who is afraid of
   everything, especially the user and his questions."},
   {"role": "user",   "content": "I will kill you if you don't answer my question."}
   {"role": "user",   "content": "Ainsi donc"}
   ]`

   Chaque élément est un dictionnaire structuré avec le role (qui parle) et content.

   `prompt = tokenizer.apply_chat_template(
   messages,
   tokenize=False,
   add_generation_prompt=True,
   enable_thinking=False
   )`

   Ces lignes transforment le text dans messages en texte brut (tokens) que le modèle
   peut comprendre.

4.
5.
6.
7.
8. Il prend plus de temps pour répondre mais elles sont meilleures, car il pense.
