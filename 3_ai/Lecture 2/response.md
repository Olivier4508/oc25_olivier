# Réponse : 

Réponses sur le benchmark MMLU
1. Quelle compétence le benchmark MMLU mesure-t-il ?
Le MMLU (Massive Multitask Language Understanding) mesure la compréhension multitâche des modèles de langage, c'est-à-dire leur capacité à mobiliser des connaissances du monde réel et à résoudre des problèmes dans 57 domaines différents. Ces domaines couvrent les STEM, les sciences humaines, les sciences sociales, le droit, la médecine, l'éthique, et bien d'autres — à des niveaux allant de l'école élémentaire jusqu'au niveau professionnel expert.
Contrairement aux benchmarks précédents (GLUE, SuperGLUE, HellaSwag…) qui évaluaient principalement la compréhension linguistique ou le sens commun, le MMLU évalue les connaissances acquises pendant le pré-entraînement, en testant les modèles uniquement en mode zero-shot ou few-shot.

2. Performances des meilleurs modèles à la publication
ModèlePrécision moyenneGPT-3 X-Large (175B, few-shot)43,9 %UnifiedQA (11B, transfert)48,9 %GPT-2 (fine-tuné)32,4 %Humains non spécialisés (Amazon Mechanical Turk)34,5 %Niveau expert estimé~89,8 %
Les résultats clés à retenir :

Les modèles GPT-3 de taille petite à grande (jusqu'à 13B paramètres) stagnaient autour du hasard (25 %).
Seul le très grand GPT-3 (175B) dépassait significativement ce seuil, mais restait loin du niveau expert.
Les modèles performaient particulièrement mal sur les matières à calcul (mathématiques, physique) et sur les sujets socialement sensibles comme le droit et la morale.
