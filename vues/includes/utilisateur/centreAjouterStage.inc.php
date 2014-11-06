<script language="JavaScript" type="text/javascript" src="../vues/javascript/fonctionsJavascript.inc.js"></script>
<script language="JavaScript" type="text/javascript" src="../bibliotheques/jquery.js"></script>
<script language="JavaScript" type="text/javascript" src=".../vues/javascript/ajax.inc.js"></script>


<!-- VARIABLES NECESSAIRES -->

<!-- $this->message : à afficher sous le formulaire -->
<form method="post" action=".?controleur=AdminPersonnes&action=validationCreerPersonne" name="CreateUser">
    <h1>Ajouter un Stage</h1>
    <!-- Choix du type de compte pour afficher les différentes informations pour créer un compte spécifique -->
    
    <!-- Données valables pour tous les rôles -->
    <fieldset>
        <legend>Les informations g&eacute;n&eacute;rales</legend>
        <label for="annee">Ann&eacutee scolaire :</label>

        <select type="select" name="annee" id="annee">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        <label for="eleve">&Eacute;l&egrave;ve :</label>

        <select type="select" name="civilite" id="civilite">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        <label for="civilite">Ann&eacutee scolaire :</label>

        <select type="select" name="civilite" id="civilite">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        <label for="civilite">Ann&eacutee scolaire :</label>

        <select type="select" name="civilite" id="civilite">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        <label for="civilite">Ann&eacutee scolaire :</label>

        <select type="select" name="civilite" id="civilite">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        <label for="civilite">Ann&eacutee scolaire :</label>

        <select type="select" name="civilite" id="civilite">
            <?php foreach ($this->lireDonnee('lesRoles') as $role) {
                echo'<option value="' . $role->getId() . '">' . $role->getLibelle() . '</option>';
            }?>
        </select>
        
    </fieldset>

    <!-- Information nécessaire uniquement aux étudiants -->

    <div id="Formulaire_Etudiant" style="display:none" height="0">
        <fieldset>
            <legend>Informations specifiques aux étudiant</legend>


            <label for="etudes">Etudes :</label>
            <input type="text" name="etudes" id="etudes"></input><br/>
            <label for="formation">Formation :</label>
            <input type="text" name="formation" id="formation"></input><br/>
            <label for="option">Specialité :</label>
            <select name ="option" id="option">
                <option value=""> </option>
                <?
//création du contenu du select pour les spécialités des étudiants
                foreach ($this->lireDonnee('lesSpecialites') as $spe) {
                    echo'<option value="' . $spe->getId() . '">' . $spe->getLibellecCourt() . '</option>'; //echo de la ligne 
                }
                ?>
            </select>

        </fieldset>

    </div>





    <!-- Information nécessaire uniquement aux maitre de stage -->

    <div id="Formulaire_MaitreStage" style="display:none" height="0">
        <fieldset>
            <legend>Choisir l'entreprise :</legend>

            <label for="login">Entreprise :</label>
            <select type ="select" name="entreprise1" id="entreprise1"><!--selecte de choix d'entreprise-->
                <option value=""></option>

                <?php
                foreach ($this->lesEntreprise as $LesEntreprise) { // boucle d'affichage de toute les entreprise
                    // création d'une ligne du selecte 
                    echo'<option value="' . $LesEntreprise->IDORGANISATION . '">' . $LesEntreprise->NOM_ORGANISATION . '</option>';
                }
                ?>    
            </select> 

        </fieldset>

    </div>





    <!-- Donnée de conection des utilisateur -->
    <fieldset>
        <legend>Ses identifiants de connexion</legend>
        <label for="login">Login :</label>
        <input type="text" name="login" id="login"></input><br/>
        <label for="mdp">Mot de passe :</label>
        <input type="password" name="mdp" id="mdp"></input><br/>
        <label for="mdp2">Retaper le mot de passe :</label>  <!-- vérification de mots de passe -->
        <input type="password" name="mdp2" id="mdp2"></input><br/>

    </fieldset>
    <fieldset>
        <input type="submit" value="Creer" onclick="return valider()"></input><!-- OnClick éxécutera le JS qui testera tout les champ du formulaire. -->
        <input type="button" value="Retour" onclick="history.go(-1)">
    </fieldset>
</form>
<?php
// message de validation de création ou non 
if (isset($this->message)) {
    echo "<strong>" . $this->message . "</strong>";
}
?>
