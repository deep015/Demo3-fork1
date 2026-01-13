"""
Módulo de teste para treinarmos forks e pull-requests
"""


# Classes

class AstrideGata:
    def __init__(self):
        
        self.nome = "Astride"
        self.classe = "Valquiria"
    
    def caracterizacao(self):
        return "A Astride é muito gostosa!"


# Função Main

def main():
    
    a = AstrideGata()
    print(a.caracterizacao())

if __name__ == "__main__":
    main()