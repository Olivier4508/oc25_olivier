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

1. L’identifiant suit la convention des modèles publiés sur la plateforme Hugging Face.

  Qwen
  → C’est le nom de l’organisation qui publie le modèle.
  Il s’agit de l’équipe de recherche de Alibaba Cloud, qui développe la famille de
  modèles Qwen.

  Qwen3
  → Indique la version majeure de la famille de modèles.
  Ici, c’est la troisième génération des modèles Qwen, avec des améliorations
  architecturales et d’entraînement par rapport aux versions précédentes.

  0.6B
  → Signifie 0.6 billion, donc 600 millions de paramètres.
  C’est la taille du modèle.

  Base
  → Indique que c’est la version pré-entraînée brute (non fine-tunée pour le dialogue ou
  les instructions).
  Elle n’a pas été optimisée avec du RLHF ou des instructions conversationnelles.

  Pourquoi utiliser la version 0.6B? Car elle est beaucoup plus légère qu'une version 7B    ou 14B par exemple, ce qui permet de faire tourner ce modèle rapidement sur des
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
