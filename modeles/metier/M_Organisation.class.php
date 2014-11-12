<?php

/**
 * Description of M_Role
 *
 * @author btssio
 */
class M_Organisation {

    private $idOrganisation;
    private $nomOrganisation;
    private $villeOrganisation;
    private $adresseOrganisation;
    private $cpOrganisation;
    private $telOrganisation;
    private $faxOrganisation;
    private $formeJuridique;
    private $activite;

    function __construct($id, $nom, $ville, $adresse, $cp, $tel, $fax, $formeJuridique, $activite) {
        $this->idOrganisation = $id;
        $this->nomOrganisation = $nom;
        $this->villeOrganisation = $ville;
        $this->adresseOrganisation = $adresse;
        $this->cpOrganisation = $cp;
        $this->telOrganisation = $tel;
        $this->faxOrganisation = $fax;
        $this->formeJuridique = $formeJuridique;
        $this->activite = $activite;
    }
        
    public function getIdOrganisation() {
        return $this->idOrganisation;
    }

    public function getNomOrganisation() {
        return $this->nomOrganisation;
    }

    public function getVilleOrganisation() {
        return $this->villeOrganisation;
    }

    public function getAdresseOrganisation() {
        return $this->adresseOrganisation;
    }

    public function getCpOrganisation() {
        return $this->cpOrganisation;
    }

    public function getTelOrganisation() {
        return $this->telOrganisation;
    }

    public function getFaxOrganisation() {
        return $this->faxOrganisation;
    }

    public function getFormeJuridique() {
        return $this->formeJuridique;
    }

    public function getActivite() {
        return $this->activite;
    }

    public function setIdOrganisation($idOrganisation) {
        $this->idOrganisation = $idOrganisation;
    }

    public function setNomOrganisation($nomOrganisation) {
        $this->nomOrganisation = $nomOrganisation;
    }

    public function setVilleOrganisation($villeOrganisation) {
        $this->villeOrganisation = $villeOrganisation;
    }

    public function setAdresseOrganisation($adresseOrganisation) {
        $this->adresseOrganisation = $adresseOrganisation;
    }

    public function setCpOrganisation($cpOrganisation) {
        $this->cpOrganisation = $cpOrganisation;
    }

    public function setTelOrganisation($telOrganisation) {
        $this->telOrganisation = $telOrganisation;
    }

    public function setFaxOrganisation($faxOrganisation) {
        $this->faxOrganisation = $faxOrganisation;
    }

    public function setFormeJuridique($formeJuridique) {
        $this->formeJuridique = $formeJuridique;
    }

    public function setActivite($activite) {
        $this->activite = $activite;
    }


}
